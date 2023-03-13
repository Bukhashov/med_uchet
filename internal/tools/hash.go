package tools

import (
	"golang.org/x/crypto/bcrypt"
	"github.com/Bukhashov/med_uchet/internal/model"
)

func HashPassword(password string, userModel *model.User)(err error){
	hash, err := bcrypt.GenerateFromPassword([]byte(password), 8); if err != nil {
		return err;
	}

	userModel.Password = string(hash)

	return nil
}