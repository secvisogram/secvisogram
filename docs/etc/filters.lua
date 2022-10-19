-- set the current date in an os agnostic way
function Meta(m)
  if m.date == nil then
    m.date = os.date("%Y-%m-%d")
    return m
  end
end
