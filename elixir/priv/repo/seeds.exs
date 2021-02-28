# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
    # Homework.Repo.insert!(%Homework.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.


#   Seeding the Merchants

#   alias Homework.Merchants
  Enum.each(0..19, fn
    0 -> :nothing
    _ ->  Merchants.create_merchant(
      %{name: Faker.Company.name(), description: Faker.Company.bs()}
    )
  end)

#  Seeding the Users

#   alias Homework.Users
  Enum.each(0..9, fn
      0 -> :nothing
      _ ->  Users.create_user(
    %{dob: "02/12/1969", first_name: Faker.Person.first_name(), last_name: Faker.Person.last_name()}
    )
  end)


#   Seeding the Transactions
  alias Homework.Transactions
  alias Homework.Users.User
  alias Homework.Merchants.Merchant

  users = Homework.Repo.all(User)
  user = Enum.random(users)
  merchants = Homework.Repo.all(Merchant)
  merchant = Enum.random(merchants)

  transactions = Enum.each(0..150, fn
    0 -> :nothing
    _ ->  Transactions.create_transaction(
      %{
        amount: Enum.random(1..22_999),
        credit: false,
        debit: true,
        description: Faker.Lorem.paragraph(1),
        user_id: user.id,
        merchant_id: merchant.id,
      }
    )
  end)