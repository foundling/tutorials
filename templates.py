
#!/usr/bin/env python
'''
  a simple demo of templating in Python
'''

from string import Template

template_string = '$1 $2 $3'
template = Template(template_string)
values = dict(a=1,b=2,c=3)
t.safe_substitute(values)
t.substitute(values)
