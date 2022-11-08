message = 'global'

def enclosing():
    message = 'enclosing'
    print("enclosing message:", message)
    def local():
        message = 'local'
    print('enclosing message:', message)
    local()
    print('enclosing message:', message)

print("global message:", message)
enclosing()
print('global message:', message)

import time

def make_timer():
    last_called = None  # Never

    def elapsed():
        nonlocal last_called
        now = time.time()
        if last_called is None:
            last_called = now
            return None
        result = now - last_called
        last_called = now
        return result

    return elapsed

def escape_unicode(f):
    def wrap(*args, **kwargs):
        x = f(*args, **kwargs)
        print(x)
        return ascii(x)

    return wrap

@escape_unicode
def northern_city():
    return 'Tromsø'

def western_city():
    return 'Tromsø'
