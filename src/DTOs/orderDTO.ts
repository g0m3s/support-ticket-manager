import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

export type OrderFirestoreDTO = {
  patrimony: number
  description: string
  solution?: string
  status: 'open' | 'closed'
  created_at: FirebaseFirestoreTypes.Timestamp
  closed_at?: FirebaseFirestoreTypes.Timestamp
}
