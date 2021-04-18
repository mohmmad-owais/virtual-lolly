const { ApolloServer, gql } = require("apollo-server-lambda");
var faunadb = require("faunadb"),
  q = faunadb.query;
const shortid = require("shortid");

const typeDefs = gql`
  type Query {
    getVCard: [vCard]
  }
  type vCard {
    c1: String!
    c2: String!
    c3: String!
    sender: String!
    rec: String!
    msg: String!
    link: String!
  }
  type Mutation {
    addVCard(
      c1: String!
      c2: String!
      c3: String!
      sender: String!
      rec: String!
      msg: String!
    ): vCard
  }
`;

const resolvers = {
  Query: {
    getVCard: async (root, args, context) => {
      try {
        var adminClient = new faunadb.Client({
          secret: 'fnAEHCj72mACBYyyK5gOGRDlL2Jfi7MLRMt9wmGK',
        });
        const result = await adminClient.query(
          q.Map(
            q.Paginate(q.Match(q.Index("link"))),
            q.Lambda((x) => q.Get(x))
          )
        );
        // console.log(result.data);

        return result.data.map((d) => {
          return {
            c1: d.data.c1,
            c2: d.data.c2,
            c3: d.data.c3,
            sender: d.data.sender,
            rec: d.data.rec,
            msg: d.data.msg,
            link: d.data.link,
          };
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    addVCard: async (_, { c1, c2, c3, rec, msg, sender }) => {
      var adminClient = new faunadb.Client({ secret: 'fnAEHCj72mACBYyyK5gOGRDlL2Jfi7MLRMt9wmGK' });

      console.log(c1, c2, c3, rec, msg, sender)
      const result = await adminClient.query(
        q.Create(
          q.Collection('vCards'),
          {
            data: {
              c1, c2, c3, rec, msg, sender,
              link: shortid.generate()
            }
          },
        )
      )
      return result.data.data
    }
  }
}
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = server.createHandler();

module.exports = { handler };