package user

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (u *user) Singin(c *gin.Context) {
	dto := Dto{}
	
	err := c.BindJSON(&dto); if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{ "massage" : "service bad work", })
		return
	}

	//  қолданушыны деректер базасынан іздейміз
	

}