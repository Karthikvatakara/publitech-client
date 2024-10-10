
  export interface PopulatedUser {
    username: string;
    email: string;
  }
  
  export interface PopulatedPaymentEntity {
    _id: string;
    userId: PopulatedUser;
    instructorRef: PopulatedUser;
    method: string;
    status: "pending" | "completed" | "failed";
    amount: number;
    createdAt: Date;
    updatedAt: Date;
  }