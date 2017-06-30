import Prelude

merge :: Ord a => [a] -> [a] -> [a]
merge xs []         = xs
merge [] ys         = ys
merge (x:xs)(y:ys)	= (mergeHelp x y)++(merge xs ys)

mergeHelp		:: Ord a => a -> a -> [a]
mergeHelp x y 	| x < y     = x:(y:[])
				| otherwise = y:(x:[])