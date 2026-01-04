# Deletion test

- Job listing to be deleted 

```json
    {
        "id": 6,
        "profileId": 1,
        "company": "DoorDash",
        "locationType": "In Person",
        "link": "http://lmaodash.com",
        "postingDate": "05/02/1999",
        "numInterviews": 200,
        "numInterviewsCompleted": 52,
        "level": "Mid Senior",
        "salary": 10000,
        "status": "Ghosted"
    }
```

- contacts to be modified 

    {
        "id": 10,
        "profileId": 1,
        "jobListingId": 6,
        "firstName": "Driver",
        "lastName": "Smith",
        "email": "leDriver@aol.com",
        "phoneNum": "8478488288",
        "type": "Other",
        "description": "Brochacho wanted to get me a job. Think it could pan out. I love the food so whatever."
    }

     {
        "id": 9,
        "profileId": 1,
        "jobListingId": 6,
        "firstName": "James",
        "lastName": "Gordon",
        "email": "jgod@gmail.com",
        "phoneNum": "8788888198",
        "type": "Employee",
        "description": "Met the guy, said he could get me a job here. big lmao!"
    }

- Notes 

    {
        "id": 7,
        "name": "DashNoterino",
        "content": "Seems like this app is coming along nicely.\n\nThis seems like it could actually be useful someday.\n\nI'll get it to the point where I'll be using the application."
    }