--[[
    NightTime RP - Website Integration Resource
    Place this in your FiveM server's resources folder
    Add to server.cfg: ensure nighttime-integration
]]

local WEBSITE_URL = "http://localhost:3000"  -- Change to your website URL if hosted remotely
local API_KEY = "YOUR_SERVER_KEY_HERE"  -- Replace with your cfxk_ key
local UPDATE_INTERVAL = 10

-- Send server status to website periodically
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(UPDATE_INTERVAL * 1000)
        SendStatusToWebsite()
    end
end)

-- Send status update to website
function SendStatusToWebsite()
    local players = GetPlayers()
    local playerData = {}

    for _, playerId in ipairs(players) do
        local playerName = GetPlayerName(playerId)
        local ping = GetPlayerPing(playerId)
        table.insert(playerData, {
            id = tonumber(playerId),
            name = playerName or "Unknown",
            ping = ping or 0,
        })
    end

    local payload = json.encode({
        players = playerData,
        maxPlayers = GetConvar("sv_maxclients", "48"),
        hostname = GetConvar("sv_hostname", "NightTime RP"),
        map = GetConvar("sv_mapname", "Los Santos"),
    })

    -- Send to website backend
    PerformHttpRequest(WEBSITE_URL .. "/api/chat/game", function(code, text)
        -- Status sent silently
    end, "POST", json.encode({
        username = "[SYSTEM]",
        message = json.encode({
            type = "status_update",
            players = playerData,
        })
    }), {
        ["Content-Type"] = "application/json",
        ["X-API-Key"] = API_KEY,
    })
end

-- Handle chat messages from website -> game
RegisterNetEvent("nighttime:websiteChat")
AddEventHandler("nighttime:websiteChat", function(username, message)
    -- Broadcast to all players
    TriggerClientEvent("nighttime:chatMessage", -1, username, message)
end)

-- Handle in-game chat -> website
RegisterNetEvent("nighttime:gameChat")
AddEventHandler("nighttime:gameChat", function(message)
    local src = source
    local playerName = GetPlayerName(src) or "Unknown"

    PerformHttpRequest(WEBSITE_URL .. "/api/chat/game", function(code, text)
        -- Message sent silently
    end, "POST", json.encode({
        username = playerName,
        message = message,
    }), {
        ["Content-Type"] = "application/json",
        ["X-API-Key"] = API_KEY,
    })
end)

-- Command for players to send messages to website
RegisterCommand("forum", function(source, args, rawCommand)
    local src = source
    local message = table.concat(args, " ")
    if #message < 1 then
        TriggerClientEvent("chat:addMessage", src, {
            args = { "^1[FORUM]", "Usage: /forum [message]" }
        })
        return
    end

    TriggerEvent("nighttime:gameChat", message)
    TriggerClientEvent("chat:addMessage", src, {
        args = { "^2[FORUM]", "Message sent to website: " .. message }
    })
end, false)

-- Print startup message
Citizen.CreateThread(function()
    print("^2[NightTime RP]^0 Website integration loaded!")
    print("^2[NightTime RP]^0 Website URL: " .. WEBSITE_URL)
end)
