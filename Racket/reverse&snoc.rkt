#lang racket

;snoc
(define snoc
  (lambda (ls x)
    (cond
      ((null? ls) (cons x '()))
      (else
       (cons (car ls) (snoc (cdr ls) x))))))

;atom?
(define atom?
  (lambda (x)
    (and (not (pair? x)) (not (null? x)))))

;reverse
(define reverse
  (lambda (ls)
    (cond
      ((null? ls) ls)
      ((atom? ls) ls)
      (else
       (snoc (reverse (cdr ls)) (reverse (car ls)))))))