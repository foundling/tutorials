#!/usr/bin/env python
from sys import exit
import timeit

numlist = range(10000)

def wrapper(func,*args,**kwargs):

  def wrapped():
    return func(*args,**kwargs)
  return wrapped
  
def pythonic(numlist):
  return numlist[-1]

def unpythonic(numlist):
  return numlist[len(numlist)-1]

pythonic_test = wrapper(pythonic,numlist)
pythonic_test = timeit.Timer(pythonic_test,"print 'pythonic'")

unpythonic_test = wrapper(unpythonic,numlist)
unpythonic_test = timeit.Timer(unpythonic_test,"print 'unpythonic'")

pypop_test = wrapper(pypop,numlist)
pypop_test = timeit.Timer(pypop_test,"print 'pythonic'")

pythonic_results = pythonic_test.repeat()
print pythonic_results
unpythonic_results = unpythonic_test.repeat()
print unpythonic_results
