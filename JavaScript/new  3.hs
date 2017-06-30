import Prelude

losq  :: Int -> [Int]
losq n = [x^2 | x <- [1..n]]