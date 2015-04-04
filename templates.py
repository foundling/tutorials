#!/usr/bin/env python
'''
  a simple demo of templating in Python
'''

from string import Template

# The '$' is peeled off and the remaining part is used as the key
# we use the key to get the value in the 'values' dictionary
# the value that the key gets us is then inserted into the string

template_string = 'Dear $designator $first_name $last_name,\nThis is spam. Sorry.\nRegards,\nSpam, Inc.'
values = dict(designator='Mr.',first_name='Michael',last_name='Jackson')

template = Template(template_string)
template.safe_substitute(values)
template.substitute(values)
