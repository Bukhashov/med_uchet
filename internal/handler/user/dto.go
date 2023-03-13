package user

// import (
// 	"go.mongodb.org/mongo-driver/bson/primitive"
// )

type Dto struct {
	LastName 	string `json:"lastname" validate:"required"`
	FirstName 	string `json:"firstname" validate:"required"`
	Email 		string `json:"email" validate:"required,email"`
	Password	string `json:"password" validate:"gte=8,lte=100"`
	Position	string `json:"position" validate:"required"`
}

type confirmDto struct {
	UserId 	string	`json:"userId"`
	Number 	string 	`json:"number"`
}