# node-red-contrib-cloudhook-client
---

## How to use?

Cloudhook is a server application that enables the forwarding of messages from one system to another via a server. It's intention is to provide a way to get the webhooks sent by so many SaaS applications to on-prem and behind-firewall systems. This enables event driven scripts and programs to act in near realtime to things happening in cloudy applications. In reality though, anything capable of sending an HTTP request can be forwarded to your scripts or programs via Cloudhook.

To trigger a Node-RED flow via cloudhook, drop a **Cloudhook Standard** node in to your flow.

1. Set the configuration to point at a Cloudhook server.
2. Set the `tenant` to something useful to you, i.e. your email plus a random string.
3. Set the hook `value` to something meaningful about the application you're going to be triggering, but make sure you add a long unguessable string on the end to make sure it can't just be stumbled upon. **REMEMBER: Anyone that knows the tenant name and the hook can send it messages! That means your flow!**
4. Set up the rest of your flow.
5. Send an HTTP Post to `https://cloudhook.whatever.com/hook/tenant/hook/` (replacing `tenant` and `hook` with what ever you specified in the node config.)
6. Your node should emit the POST body!

## Nodes

- Cloudhook Standard
- Cloudhook Load Balance
- Cloudhook Hash
