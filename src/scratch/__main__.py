import sys
import counter

segments = sys.argv[1:]
full_text = ' '.join(segments)
print(*counter.count(full_text))
print(counter.count(full_text))
output = '# words: {}, #chars: {}'.format(*counter.count(full_text))
print(output)
