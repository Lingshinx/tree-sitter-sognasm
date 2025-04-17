package tree_sitter_sognasm_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_sognasm "github.com/tree-sitter/tree-sitter-sognasm/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_sognasm.Language())
	if language == nil {
		t.Errorf("Error loading Sognasm grammar")
	}
}
