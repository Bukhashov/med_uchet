package model

type User struct {
	Id			string `json:"id"`
	LastName	string `json:"lastname"`
	FirstName	string `json:"firstname"`
	Email		string `json:"email"`
	Password 	string `json:"password"`
	Position	string `json:"position"`
	Confirm		bool   `json:"confirm"`	
}