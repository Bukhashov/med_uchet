package tools

import (
	"fmt"
	"math/rand"
	// "strings"
)

const (
	min = 1000
	max = 9999
)

func RandNamber() (number string) {
	n := rand.Intn(max - min + 1) + min
	number = fmt.Sprintf("%v", n)
	
	return number
}