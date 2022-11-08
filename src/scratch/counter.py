from functools import reduce
from operator import mul

def count(text_file):
    words = text_file.split()
    return (len(words), sum(len(w) for w in words))
    
def compute(n1, n2):
    r = n1*n2
    #print(f"{n1} * {n2} = {r}")
    return r

def hypervolume(*args):
    return reduce(mul, args)
    return reduce(compute, args)

def createTag(name, **kwargs):
    tag = '<' + name
    for key,val in kwargs.items():
        #tag += ' {k}={v}'.format(k=key, v=str(val)) 
        tag += ' {k}="{v}"'.format(k=key, v=str(val))
        
    tag += '>'  
    return tag  
      
if __name__== '__main__':
    print(count("Counting the words and characters in a sentence"))
