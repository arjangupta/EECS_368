#lang racket

;;GIVEN FUNCTION
(define atom?
  (lambda (x)
    (and (not (pair? x)) (not (null? x)))))

;;AUXILIARY FUNCTION FOR TIMESDEPTH
;;1. Takes in a depth, a factor (m) and a list (ls)
;;2. To each atom in the list, it applies this: atom = atom * (m + depth)
(define timesdepthaux
  (lambda (depth m ls)
    (cond
      ((null? ls) '()) 
      ((atom? (car ls)) (cons
             (* (car ls) (+ m depth))
             (timesdepthaux m depth (cdr ls))))
      (else (cons
             (timesdepthaux m (+ 1 depth) (car ls))
             (timesdepthaux m depth (cdr ls)))))))

;;TIMESDEPTH
;;1. Adds on a parameter (depth) to the given parameters
;;2. The depth parameter is initialized to 0
(define timesdepth*
  (lambda (m ls)
    (timesdepthaux 0 m ls)))