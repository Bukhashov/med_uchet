package user

import (
	"context"
	"fmt"
	"net/http"
	
	"github.com/Bukhashov/med_uchet/internal/model"
	"github.com/Bukhashov/med_uchet/internal/storage"
	"github.com/Bukhashov/med_uchet/internal/tools"
	"github.com/Bukhashov/med_uchet/pkg/client/mailer"

	"github.com/go-playground/validator/v10"
	"github.com/gin-gonic/gin"
)

const (
	pathHTMLForConfirm = "assets/letters/mail/confirm.html"
)

func (u *user) Singup(c *gin.Context) {
	dto := Dto{}

	err := c.BindJSON(&dto); if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"massage" : "service bad work",
		})
		return
	}
	
	validate = validator.New()
	if err := validate.Struct(&dto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"massage" : "data validate error",
		})
		return
	}

	userModel := model.User{
		FirstName: dto.FirstName,
		LastName: dto.LastName,
		Position: dto.Position,
		Email: dto.Email,
		Confirm: false,
	}

	// Жаңа [user] дін email басқа қолданушы тіркеп қоймаған жайлы Деректер қорынан тексеру
	userStroge := storage.NewUser(u.client, u.logger)

	err = userStroge.FindByEmail(context.TODO(), &userModel); if err == nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"massage" : "this email yes",
		})
		return
	}

	err = tools.HashPassword(dto.Password, &userModel); if err != nil {
		u.logger.Error(err)
		c.JSON(http.StatusBadRequest, gin.H{
			"massage" : "err in hash password",
		})
		return
	}
	
	err = userStroge.Create(context.TODO(), &userModel); if err != nil {
		u.logger.Error(err)
		c.JSON(http.StatusBadRequest, gin.H{
			"massage" : "err | database create user",
		})
		return
	}
	
	fmt.Print(userModel.Id)

	confirmModel := model.Confirm{
		UserId: userModel.Id,
		Number: tools.RandNamber(),
	}

	confirmStorage := storage.NewConfirmStrage(u.client, u.logger)
	if err := confirmStorage.Create(context.TODO(), &confirmModel); err != nil {
		u.logger.Error(err)
		c.JSON(http.StatusBadRequest, gin.H{
			"massage" : "err | create confirm",
		})
		return
	}

	mailler := mailer.NewMailer(u.cfg.Smtp, u.logger, userModel.Email, "Confirm User Email")
	mailler.ParseTemplate(pathHTMLForConfirm, map[string]string{
		"code" : confirmModel.Number,
		"title": "berik",
	})
	if err = mailler.Send(); err != nil {
		u.logger.Error(err)
	}

	c.JSON(http.StatusCreated, &userModel)
}