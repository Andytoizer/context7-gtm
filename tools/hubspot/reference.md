# Reference

## CRM Object Search

HubSpot CRM object search commonly uses object-specific search endpoints with filter groups, sort rules, selected properties, and paging cursors. Agents should confirm the target object type, requested properties, and required scopes before issuing bulk reads.

## Associations

Associations connect CRM records such as contacts, companies, deals, tickets, and custom objects. Implementations should verify association type IDs and direction before creating or replacing relationships, because association semantics vary by object pair and account configuration.

## Authentication Notes

Private app tokens are suitable for account-scoped automation when the app has the required CRM scopes. OAuth is the safer default for public or multi-account apps because scopes and installation context are explicit.
