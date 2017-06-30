import Prelude

losq  		:: Int -> [Int]
losq n 		 = [x^2 | x <- [1..n]]

addls 		:: [Int] -> Int
addls [] 	 = 0
addls (x:xs) = x + (addls xs)

addsq	  	:: Int -> Int
addsq n 	 = addls (losq n)