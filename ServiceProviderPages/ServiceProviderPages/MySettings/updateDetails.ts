export type updateUserDetail = {
    FirstName:string,
    LastName:string,
    Mobile:string,
    DateOfBirth:Date,
    NationalityId:number,
    Gender:string,
    GenderId:number,
    ProfilePicture:string
    Address: {
      StreetName:string,
      HouseNumber:string,
      PostalCode:string,
      City:string
    }
  }