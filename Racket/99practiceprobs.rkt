#lang racket

; find the element at an index in a list
(define element-at
  (lambda (ls x)
    (cond
      ((null? ls) '())
      ((< (length ls) x) '())
      ((= x 1) (car ls))
      (else (element-at (cdr ls) (- x 1))))))

; length function
(define lengthof
  (lambda (ls)
    (cond
      ((null? ls) 0)
      (else (+ (lengthof (cdr ls)) 1)))))

; reverse a list
(define myreverse
  (lambda (ls)
    (cond
      ((null? ls) ls)
      ((= (length ls) 1) ls)
      (else (flatten (cons (reverse (cdr ls)) (cons (car ls) '())))))))

; using let
(define t
  (lambda (ls)
    (let ((a (car ls))(b (cdr ls)))
      a)))

; atom?
(define atom?
  (lambda (x)
    (and (not (pair? x)) (not (null? x)))))

; flatten a list
(define flatten
  (lambda (ls)
    (cond
      ((null? ls) ls)
      ((not (pair? ls)) (cons ls '()))
      (else (append (flatten (car ls)) (flatten (cdr ls)))))))
        