export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
  }
  
  export const payments: Payment[] = [
    { id: "728ed52f", amount: 100, status: "pending", email: "m@example.com" },
    { id: "489e1d42", amount: 125, status: "processing", email: "a@example.com" },
    { id: "f62b1d9d", amount: 75, status: "success", email: "b@example.com" },
    { id: "a7b3c2e1", amount: 200, status: "failed", email: "c@example.com" },
    { id: "e8d4a1c3", amount: 150, status: "success", email: "d@example.com" },
    { id: "b9c2d3f4", amount: 50, status: "pending", email: "e@example.com" },
    { id: "c1e3d4b5", amount: 175, status: "processing", email: "f@example.com" },
    { id: "d2a1c3b4", amount: 90, status: "success", email: "g@example.com" },
  ]