-- Author: Arjan Gupta
-- Date: 11/24/2015
-- Purpose: HW#4, EECS 368 

import Prelude

merge :: Ord a => [a] -> [a] -> [a]
merge xs []         = xs
merge [] ys         = ys
merge (x:xs)(y:ys)	| (x < y)	= x:(merge xs (y:ys))
					| otherwise	= y:(merge (x:xs) ys)