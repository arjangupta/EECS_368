#lang racket

(define my-last
  (lambda (x)
    (cond
      ((= (length x) 1) (car x))
      (else (my-last (cdr x))))))