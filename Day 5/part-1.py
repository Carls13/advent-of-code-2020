file = open("entries.txt", 'r')
data = file.readlines()

inputs = []

for element in data:
    inputs.append(element.strip())

ids = []

for word in inputs:
    seats = list(range(128))
    for char in word[0:7]:
        end = len(seats) / 2
        if char == 'F':
            seats = seats[0:int(end)]
        else:
            seats = seats[int(end):]
    row = seats[0]
    seats = list(range(8))
    for char in word[7:]:
        end = len(seats) / 2
        if char == 'L':
            seats = seats[0:int(end)]
        else:
            seats = seats[int(end):]
    column = seats[0]
    id = row*8 + column
    ids.append(id)
print(max(ids))
