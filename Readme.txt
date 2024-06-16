1) The idea is to first store all the dictionary words into a Trie Data structure,
since each subsequent look up of a word would be done in O(n * l), 
where n = number of words in dictionary and 
l = average length of each word

2) Then we compute a set of unique permutations of the input string, such that we store
even partial words since the requirements state that "Each letter in the 
input string may be used up to once per word", which means a letter can even be used 
zero times

3) Now we check each word that we find as a permutation against the Trie Data structure
to see if that permutation exists in the dictionary