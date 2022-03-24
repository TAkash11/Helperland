export type updateUserDetail = {
    FirstName:string,
    LastName:string,
    Mobile:string,
    DateOfBirth:Date,
    Gender:string,
    Address: {
      StreetName:string,
      HouseNumber:string,
      PostalCode:string,
      City:string
    }
  }