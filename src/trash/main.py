tabs = [
    {'num': 1, 'message': 'you choosed one'},
    {'num': 2, 'message': 'you choosed two'},
    {'num': 3, 'message': 'you choosed three'},
    {'num': 4, 'message': 'you choosed four'},
    {'num': 5, 'message': 'you choosed five'}
]

print("Welcome")

# tabs dynamic rendering logic
tabsStr = ""
for el in tabs:
    tabsStr += str(el['num']) + '\t'
print(tabsStr)


x = int(input("Choose a number : "))

# find the related content
for tab in tabs: 
    if tab['num'] == int(x):
        target = tab

# show the related content
print(target['message'])

