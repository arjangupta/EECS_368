import Prelude

dropit 		 :: [Int] -> [Int]
dropit [] 	  =  []
dropit (x:xs) =  x:(dropit(drop x xs))