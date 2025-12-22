package utils

import (
	"errors"
	"fmt"
	"reflect"
	"strings"
)

type Validator struct {
}

func ConstructValidator() *Validator {
	return &Validator{}
}

func (this *Validator) Test(obj any) error {

	this.ExtractValidationTags(obj)
	return nil

}

func (this *Validator) ExtractValidationTags(obj any) error {

	t := reflect.TypeOf(obj)
	val := reflect.ValueOf(obj)

	if val.Kind() != reflect.Struct {
		return errors.New("cannot extract validation tags from obj, because it's no a struct")
	}

	for i := 0; i < t.NumField(); i++ {

		field := t.Field(i)

		fmt.Println(field.Name)
		fmt.Println(val.FieldByName(field.Name))

		constraints := field.Tag.Get("validate")
		constraintsArr := strings.Split(constraints, ",")

		if constraints == "" || len(constraintsArr) == 0 {
			continue
		}

		//for _, constraint := range constraintsArr {
		//	// TODO : hanl
		//}

	}

	return nil

}
