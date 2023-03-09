package model

type User struct {
	LastName	string `json:"lastname"`
	FirstName	string `json:"firstname"`
	Email		string `json:"email"`
	Password 	string `json:"password"`
}