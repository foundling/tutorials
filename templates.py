#!/usr/bin/env python
'''
  a demo of templating in Python
'''

from string import Template

# The '$' in the template string is peeled off and the remaining part is used as the key.
#
# We use the key to get the value in the 'values' dictionary, which holds the sort of 
# values that we want to push into a template.
#
# The value that the key gets us is then inserted into the string.

template_string = 'Dear $designator $first_name $last_name,
This is spam. Sorry.
Regards,
Spam, Inc.'
values = dict(designator='Mr.',first_name='Michael',last_name='Jackson')

template = Template(template_string)
print template.safe_substitute(values)
print template.substitute(values)
