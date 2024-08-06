import supabase from "./supabase";

export interface Cabin {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
}

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*")

  if (error) {
    console.log(error)
    throw new Error("Cabins could not be loaded")
  }

  return data
}

export async function createCabin(newCabin: Cabin) {
  const { data, error } = await supabase.from("cabins").insert([newCabin])

  if (error) {
    console.log(error)
    throw new Error("Cabins could not be created")
  }

  return data
}

export async function deleteCabin(id: number) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id)

  if (error) {
    console.log(error)
    throw new Error("Cabin could not be deleted")
  }

  return data
}