import mongoose,{Document , Schema} from "mongoose";

export interface IUSER extends Document {
  name: string;
  email: string;
  pass: string;
}

const UserSchema= new Schema<IUSER> ({
    name: { type: String , required:true},
    email: { type: String , required:true},
    pass: { type: String , required:true},
})


const userModel = mongoose.model<IUSER>('Users',UserSchema );

export default userModel ;