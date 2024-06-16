"use strict";
class TrieNode {
    constructor(_isEndOfWord = false) {
        this.children = new Map();
        this.isEndOfWord = _isEndOfWord;
    }
}
class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    addWord(word) {
        let currNode = this.root;
        for (let i = 0; i < word.length; i++) {
            if (!currNode.children.has(word[i])) {
                currNode.children.set(word[i], new TrieNode());
            }
            currNode = currNode.children.get(word[i]);
        }
        currNode.isEndOfWord = true;
    }
    findWord(word) {
        //console.log(`searching ${word}`)
        let currNode = this.root;
        for (let i = 0; i < word.length; i++) {
            if (!currNode.children.has(word[i])) {
                //console.log(`cant find ${word[i]}`)
                return false;
            }
            currNode = currNode.children.get(word[i]);
        }
        return currNode.isEndOfWord;
    }
}
// gets a unique permutation set
// contains partial words also
function getUniquePermutations(word) {
    if (word.length <= 1) {
        return new Set().add(word);
    }
    const permutations = new Set();
    for (let i = 0; i < word.length; i++) {
        const char = word[i];
        const remChars = word.slice(0, i) + word.slice(i + 1);
        const remPerms = Array.from(getUniquePermutations(remChars).values());
        for (let i = 0; i < remPerms.length; i++) {
            permutations.add(remPerms[i]);
            permutations.add(char + remPerms[i]);
        }
    }
    return permutations;
}
function findWords(inputString, dictionary) {
    // First, put all dictionary words in a trie for efficient lookup
    const trieDictionary = new Trie();
    for (let i = 0; i < dictionary.length; i++) {
        trieDictionary.addWord(dictionary[i]);
    }
    // Then, find all permutations of inputString
    const permutations = Array.from(getUniquePermutations(inputString).values());
    //console.log(`permutations = ${permutations}`)
    // Then, check if each combination of the inputString exists in the trie
    const result = [];
    for (let i = 0; i < permutations.length; i++) {
        let permutation = permutations[i];
        if (trieDictionary.findWord(permutation)) {
            //console.log(`found word ${permutation}`)
            result.push(permutation);
        }
    }
    return result;
}
// Tests
console.log(findWords("tate", ["ate", "eat", "tea", "dog", "do", "god", "goo", "go", "good"]));
// Expected output: ["ate", "eat", "tea"]
console.log(findWords("", ["ate", "eat", "tea", "dog", "do", "god", "goo", "go", "good"]));
// Expected output: []
console.log(findWords("a", ["ate", "eat", "tea", "dog", "do", "god", "goo", "go", "good"]));
// Expected output: []
console.log(findWords("a", [""]));
// Expected output: []
console.log(findWords("", [""]));
// Expected output: [""]
console.log(findWords("a", ["aa"]));
// Expected output: []
console.log(findWords("aa", ["a"]));
// Expected output: ["a"]
console.log(findWords("oogd", ["ate", "eat", "tea", "dog", "do", "god", "goo", "go", "good"]));
// Expected output: ["dog", "do", "god", "goo", "go", "good"]
