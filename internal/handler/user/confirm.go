package user

import (
	"context"
	"net/http"

	"github.com/Bukhashov/med_uchet/internal/model"
	"github.com/Bukhashov/med_uchet/internal/storage"

	"github.com/gin-gonic/gin"
)

func (u *user) Confirm(c *gin.Context) {
	dto := confirmDto{}
	
	err := c.BindJSON(&dto); if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"massage" : "service bad work",
		})
		return
	}

	confirmModel := model.Confirm{
		UserId: dto.UserId,
		Number: dto.Number,
	}

	confirmStorage := storage.NewConfirmStrage(u.client, u.logger)
 	if err = confirmStorage.FindByEmail(context.TODO(), &confirmModel); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"massage" : "your code no caracte",
		})
		return
	}
	if err = confirmStorage.Delete(context.TODO(), &confirmModel); err != nil {
		u.logger.Error(err)
	}
	
	userStroge := storage.NewUser(u.client, u.logger)
	if err = userStroge.Confirm(context.TODO(), &confirmModel); err != nil {
		u.logger.Error(err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"massage" : "sorry this prosses not work",
		})
		return
	}

	
	c.JSON(http.StatusOK, gin.H{
		"massage" : "confired",
	})
}