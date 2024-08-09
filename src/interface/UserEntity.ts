
enum Role {
    student = "student",
    instructor= "instructor",
    admin= "admin"
}

enum Gender {
    male= 'male',
    female= 'female',
    other= 'other'
}

interface Profile {
    avatar?: string,
    dateOfBirth?: Date,
    gender?: Gender

}

interface SocialMedia {
    instagram?: string,
    linkedIn?: string,
    github?: string
}

interface Contact {
    additionalEmail?: string,
    socialMedia?: SocialMedia
}

export interface UserEntity {
    _id?: String;
    username: string;
    email: string;
    password?: string;
    phoneNumber?: string;
    role: Role;
    profile?: Profile;
    contact?: Contact;
    isBlocked: boolean;
    isVerified: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    proffesion?: string;
    profileDescription?: string;
    approved?: string;
    stage?: string;
}
