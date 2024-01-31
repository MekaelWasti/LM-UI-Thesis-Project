
OAGKX Keyword Generation Dataset
================================

OAGKX is a keyword extraction/generation dataset consisting
of 22674436 abstracts, titles and keyword strings from scientific 
articles. The texts were lowercased and tokenized with 
Stanford CoreNLP tokenizer. No other preprocessing steps
were applied in this release version. Dataset records 
(samples) are stored as JSON lines in each text file. 

The data is derived from OAG data collection 
(https://aminer.org/open-academic-graph) which was released 
under ODC-BY license. 

This data (OAGKX Keyword Generation Dataset) is released under 
CC-BY license (https://creativecommons.org/licenses/by/4.0/). 


Download
--------

This dataset can be download from LINDAT/CLARIN repository
http://hdl.handle.net/11234/1-3062


Publications
------------

If using it, please cite the following paper:

Çano Erion, Bojar Ondřej. Keyphrase Generation: A Multi-Aspect Survey. FRUCT 2019,
Proceedings of the 25th Conference of the Open Innovations Association FRUCT, Helsinki,
Finland, Nov. 2019

To reproduce the experiments in the above paper, you can use 
the first 100000 lines of part_0_0.txt file. 


Acknowledgements
----------------

This research work was [partially] supported by OP RDE project No. 
CZ.02.2.69/0.0/0.0/16_027/0008495, International Mobility of 
Researchers at Charles University.


Statistics of OAGKX:
--------------------

Total samples:     	22674436 
Title tokens:    	mean: 12.83 std: 4.86 min: 3 max: 25 total: 290841390 
Abstract tokens:  	mean: 175.08 std: 86.45 min: 50 max: 400 total: 3969764238 
Keyword tokens:   	mean: 11.89 std: 7.46 min: 2 max: 60 total: 269504044
No. Keywords:  		mean: 5.88 std: 3.12 min: 2 max: 12 total: 133295056  
Abs-Tit overlap: 	mean: 0.7787 std: 0.1738 
Abs-Key overlap: 	mean: 0.6769 std: 0.2462 
Present Keywords: 	mean: 0.5265 std: 0.2832
Absent Keywords: 	mean: 0.4735 std: 0.2832

