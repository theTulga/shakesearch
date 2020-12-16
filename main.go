package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"index/suffixarray"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"regexp"
	"strings"
)

func main() {
	searcher := Searcher{}
	err := searcher.Load("completeworks.txt")
	// err := searcher.Load("partialworks.txt")
	if err != nil {
		log.Fatal(err)
	}

	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/", fs)

	http.HandleFunc("/search", handleSearch(searcher))

	port := os.Getenv("PORT")
	if port == "" {
		port = "3001"
	}

	fmt.Printf("Listening on port %s...", port)
	err = http.ListenAndServe(fmt.Sprintf(":%s", port), nil)
	if err != nil {
		log.Fatal(err)
	}
}

type Searcher struct {
	CompleteWorks string
	SuffixArray   *suffixarray.Index
}

func handleSearch(searcher Searcher) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		query, ok := r.URL.Query()["q"]
		if !ok || len(query[0]) < 1 {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("missing search query in URL params"))
			return
		}
		results := searcher.Search(query[0])
		buf := &bytes.Buffer{}
		enc := json.NewEncoder(buf)
		err := enc.Encode(results)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("encoding failure"))
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(buf.Bytes())
	}
}

func (s *Searcher) Load(filename string) error {
	dat, err := ioutil.ReadFile(filename)
	if err != nil {
		return fmt.Errorf("Load: %w", err)
	}
	s.CompleteWorks = string(dat)
	s.SuffixArray = suffixarray.New(dat)
	return nil
}

func (s *Searcher) Search(query string) []string {
	regex, _ := regexp.Compile("(?i)" + strings.Replace(query, " ", "[ \\._-]", -1))
	idxs := regex.FindAllIndex([]byte(s.CompleteWorks), -1)
	results := []string{}
	lines_before := 1
	lines_after := 2
	for _, idx := range idxs {
		count := 0
		for ; idx[0] != 0; idx[0]-- {
			if s.CompleteWorks[idx[0]] == 13 {
				count++
			}
			if count == lines_before*2+1 {
				break
			}
		}
		count = 0
		for ; idx[1] != len(s.CompleteWorks)-1; idx[1]++ {
			if s.CompleteWorks[idx[1]] == 13 {
				count++
			}
			if count == lines_after*2+1 {
				break
			}
		}
		results = append(results, s.CompleteWorks[idx[0]:idx[1]])
	}
	return results
}
