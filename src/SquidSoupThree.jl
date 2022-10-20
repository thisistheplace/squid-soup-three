
module SquidSoupThree
using Dash

const resources_path = realpath(joinpath( @__DIR__, "..", "deps"))
const version = "0.0.1"

include("jl/squidsoupthree.jl")

function __init__()
    DashBase.register_package(
        DashBase.ResourcePkg(
            "squid_soup_three",
            resources_path,
            version = version,
            [
                DashBase.Resource(
    relative_package_path = "squid_soup_three.min.js",
    external_url = "https://unpkg.com/squid_soup_three@0.0.1/squid_soup_three/squid_soup_three.min.js",
    dynamic = nothing,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "squid_soup_three.min.js.map",
    external_url = "https://unpkg.com/squid_soup_three@0.0.1/squid_soup_three/squid_soup_three.min.js.map",
    dynamic = true,
    async = nothing,
    type = :js
)
            ]
        )

    )
end
end
