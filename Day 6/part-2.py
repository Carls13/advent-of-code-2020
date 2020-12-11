file = open("entries.txt", 'r')
data = file.readlines()

inputs = []

for element in data:
    inputs.append(element.strip())

groups = []

start = 0

indexes = [i for i, x in enumerate(inputs) if len(x) == 0]
for match in indexes:
    if indexes.index(match) == len(indexes) - 1:
        groups.append(inputs[match + 1:])
        break
    groups.append(inputs[start:match])
    start = match + 1

questionsCounter = 0

for group in groups:
    groupLetters = []
    for line in group:
        groupLetters.append(set([char for char in line]))
    print(groupLetters)
    common = set.intersection(*groupLetters)
    questionsCounter += len(common)
print(questionsCounter)
