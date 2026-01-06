SELECT uc."Name"
	FROM public."Users" as u
left join public."UserRolesConnectionUsers" as urcu on urcu."UserId" = u."Id"
left join public."UserClaimsConnectionRoles" as uccr on urcu."UserRoleId" = uccr."UserRoleId" 
left join public."UserClaims" as uc on uc."Id" = uccr."UserClaimId"
	where u."Id" = 1