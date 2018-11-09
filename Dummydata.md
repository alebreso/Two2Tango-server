# Users

## SQL Queries to insert dummy data

insert into users(email, password, admin)
values
('admin@example.com', 'test', true),
('user1@example.com', 'test', false),
('user2@example.com', 'test', false),
('user3@example.com', 'test', false);

## Postman data

{
"email": "admin@example.com",
"password": "test"
}

{
"email": "user1@example.com",
"password": "test"
}

# Profiles

## SQL Queries to insert dummy data

insert into profiles("firstName", "lastName", role, level, "photoUrl", age, gender, height, city, about, "userId")
values
('Cinzia', 'Tango', 'leader', 'beginner', 'https://www.w3schools.com/w3css/img_avatar3.png', 30, 'female', 170, 'Amsterdam', 'My name is Cinzia, and I am the administrator', 1),
('Adam', 'Smith', 'leader', 'beginner', 'https://www.w3schools.com/w3css/img_avatar3.png', 30, 'male', 180, 'Amsterdam', 'My name is Adam, and I have been dancing for 3 years. I like to dance for fun and not be too serious', 2),
('Bert', 'Sizzles', 'leader', 'professional', 'https://www.w3schools.com/w3css/img_avatar3.png', 30, 'male', 176, 'Rotterdam', 'My name is Bert, and I have been dancing for 14 years. I take this very professional', 3),
('Irene', 'Lato', 'follower', 'beginner', 'https://www.w3schools.com/w3css/img_avatar3.png', 30, 'male', 156, 'Utrecht', 'My name is Irene, and I have been dancing for only 1 year.', 4);

## Postman

{
"firstName": "Sally",
"lastName":"Brookes",
"role": "Follower",
"level": "beginner",
"photoUrl": "http://www.something.com/img.jpg",
"age": 28,
"gender": "female",
"height": 165,
"city": "Amsterdam",
"about": "My name is Sally, and I have been dancing for 3 years. I like to dance for fun and not be too serious"
}

# Preferences

## SQL Queries to insert dummy data

insert into preferences(role, level, age, gender, height, city, "userId")
values
('["leader"]', '["advanced"]', '[20,30]', 'male', '[175, 180]', '["Amsterdam"]', 1),
('["follower"]', '["beginner"]', '[20,30]', 'female', '[175, 180]', '["Amsterdam"]', 2),
('["leader"]', '["beginner"]', '[20,30]', 'female', '[175, 180]', '["Rotterdam"]', 3),
('["leader"]', '["beginner"]', '[20,30]', 'male', '[175, 180]', '["Utrecht"]', 4);

## Postman

{
"role": ["leader"],
"level": ["Beginner,"Intermediate"],
"age": [20, 30],
"gender": "male",
"height": [155, 160],
"city": ["Rotterdam", "Breda"]
}

# Messages

## SQL Queries to insert dummy data

insert into messages(content, "userId")
values
('Hi! I would like to dance with you Cinzia!', 1),
('Hi! I would like to dance with you Adam!', 2),
('Hi! I would like to dance with you Bert!', 3),
('Hi! I would like to dance with you Irene!', 4);

## Postmen

{
"content": "Hi! I would like to dance with you"
}
