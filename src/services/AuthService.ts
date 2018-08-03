import Parse from 'parse';
import { User } from '../modals/user';
export class AuthService
{
    email: string;
    isSigningup: boolean;
    user:User;
    signup(email:string,password:string)
    {
       return Parse.User.signUp(email,password).then((resp) => {
            this.addAdminRole();
            console.log('Signed up successfully', resp);
            this.isSigningup = false;
        }, err => {
            this.isSigningup = true;
        });
        //return firebase.auth().createUserWithEmailAndPassword(email,password);
    }
    signin(email:string,password:string)
    {
        return Parse.User.logIn(email, password).then((resp) => {
            console.log('Signed İn successfully', resp);
            this.isSigningup = true;
        }, err => {
            this.isSigningup = false;
        });
      //  return firebase.auth().signInWithEmailAndPassword(email,password);
    }
    logout(){
        Parse.User.logOut();
    }
    public currentUser(){
        let u = Parse.User.current();
        
        if (u) {
            
          var user = new User(u.id,u.get('username'),u.get('email'));
          console.log(user);
          return user;
        }
      }
    

    getActiveUser()
    {
    
        return Parse.User.current.id;
    }
    onAuthStateChanged()
    {
        return this.isSigningup;
    }
    addRoleForUser()
    {
        var user=Parse.User.current;
        var role=new Parse.ACL(Parse.User.current);
        role.setRoleReadAccess("admin",true);
        role.setRoleWriteAccess("admin",true);
        user.setACL(role);
        user.save(null,{useMasterKey:true});
    }
 addAdminRole()
 {
   
    //create admin role
    var adminRoleACL = new Parse.ACL();
    adminRoleACL.setPublicReadAccess(false);
    adminRoleACL.setPublicWriteAccess(false);
    adminRoleACL.set
    var adminRole = new Parse.Role("admin", adminRoleACL);
    adminRole.save();
 }
 updateUser(user:string)
 {


 }
 addUserRole()
 {
   
    //create admin role
    var adminRoleACL = new Parse.ACL();
    adminRoleACL.setPublicReadAccess(false);
    adminRoleACL.setPublicWriteAccess(false);
    var adminRole = new Parse.Role("user", adminRoleACL);
    adminRole.save();
 }
}
