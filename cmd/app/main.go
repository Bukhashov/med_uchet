package main

import (
	"context"
	"time"
	"github.com/Bukhashov/med_uchet/api/v1/rest"

	"github.com/Bukhashov/med_uchet/pkg/logging"
	"github.com/Bukhashov/med_uchet/pkg/client/mongodb"

	"github.com/Bukhashov/med_uchet/configs"

)

func main(){
	logger := logging.GetLogger()
	cfg := configs.GetConfig()

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	
	client, err := mongodb.Connect(ctx, &cfg.Storage); if err != nil {
		logger.Error(err)
		panic("database not connect")
	}

	rest.NewRest(cfg, &logger, client)

}